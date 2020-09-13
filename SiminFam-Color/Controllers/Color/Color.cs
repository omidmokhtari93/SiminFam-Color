using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SiminFam_Color.Controllers.GetConnection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SiminFam_Color.Controllers.Color
{
    [Route("api/[controller]")]
    public class Color : Controller
    {
        public GetConnction con = new GetConnction();
        [HttpGet("/api/GetColors")]
        public IActionResult GetColorsActionResult()
        {
            con.Simin.Open();
            var colors = new List<Colors>();
            var cmd = new SqlCommand("select * from Colors", con.Simin);
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                colors.Add(new Colors()
                {
                    Id = Convert.ToInt32(rd["Id"]),
                    Color = rd["Color"].ToString()
                });
            }
            con.Simin.Close();
            return Json(new
            {
                rows = colors,
                pagesCount = 0
            });
        }
    }
}
