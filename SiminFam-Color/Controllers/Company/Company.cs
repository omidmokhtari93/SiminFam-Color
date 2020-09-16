using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SiminFam_Color.Controllers.GetConnection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SiminFam_Color.Controllers.Company
{
    [Route("api/[controller]")]
    public class Product : Controller
    {
        public GetConnction con = new GetConnction();
        [HttpGet("/api/GetCompanies")]
        public IActionResult GetCompaniesActionResult()
        {
            con.Simin.Open();
            var companies = new List<Companies>();
            var cmd = new SqlCommand("select * from Companies", con.Simin);
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                companies.Add(new Companies()
                {
                    Id = Convert.ToInt32(rd["Id"]),
                    Company = rd["Company"].ToString()
                });
            }
            con.Simin.Close();
            return Json(new
            {
                rows = companies,
                pagesCount = 0
            });
        }

        [HttpPost("/api/SaveCompany")]
        public IActionResult SaveCompanyActionResult([FromBody] Companies company)
        {
            if (company.Company == "")
            {
                return Json(new
                {
                    message = "مقدار ورودی خالی است",
                    type = "error",
                    data = new { }
                });
            }
            con.Simin.Open();
            var cmd = new SqlCommand("insert into Companies (Company) values (N'" + company.Company + "') SELECT SCOPE_IDENTITY() ", con.Simin);
            var id = cmd.ExecuteScalar();
            con.Simin.Close();
            return Json(new
            {
                message = "با موفقیت ثبت شد",
                type = "success",
                data = new { id = id, company = company.Company }
            });
        }

        [HttpPost("/api/EditCompany")]
        public IActionResult EditCompanyActionResult([FromBody] Companies company)
        {
            if (company.Company == "")
            {
                return Json(new
                {
                    message = "مقدار ورودی خالی است",
                    type = "error",
                    data = new { }
                });
            }
            con.Simin.Open();
            var cmd = new SqlCommand("update Companies set Company = N'" + company.Company + "' " +
                                     "where Id = " + company.Id + " ", con.Simin);
            cmd.ExecuteNonQuery();
            con.Simin.Close();
            return Json(new
            {
                message = "با موفقیت ویرایش شد",
                type = "success",
                data = new { id = company.Id, company = company.Company }
            });
        }
    }
}
