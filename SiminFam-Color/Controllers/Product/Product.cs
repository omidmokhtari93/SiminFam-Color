using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SiminFam_Color.Controllers.GetConnection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SiminFam_Color.Controllers.Product
{
    [Route("api/[controller]")]
    public class Product : Controller
    {
        public  GetConnction con = new GetConnction();
        [HttpGet("/api/GetProducts")]
        public IActionResult GetProductsActionResult()
        {
            con.Simin.Open();
            var products = new List<Products>();
            var cmd = new SqlCommand("select * from Products", con.Simin);
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                products.Add(new Products()
                {
                    Id = Convert.ToInt32(rd["Id"]),
                    Product = rd["Product"].ToString()
                });
            }
            con.Simin.Close();
            return Json(new
            {
                rows = products,
                pagesCount = 0
            });
        }
    }
}
