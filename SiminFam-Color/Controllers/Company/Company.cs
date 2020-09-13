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
    }
}
