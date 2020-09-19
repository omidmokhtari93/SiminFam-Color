using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SiminFam_Color.Controllers.GetConnection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SiminFam_Color.Controllers.Color
{
    [Authorize]
	[ApiController]
    [Route("api/[controller]")]
    public class Color : ControllerBase
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
            return new JsonResult(new
            {
                rows = colors,
                pagesCount = 0
            });
        }

        [HttpPost("/api/SaveColor")]
        public IActionResult SaveColorActionResult([FromBody] Colors color)
        {
            if (color.Color == "")
            {
                return new JsonResult(new
                {
                    message = "مقدار ورودی خالی است",
                    type = "error",
                    data = new { }
                });
            }
            con.Simin.Open();
            var cmd = new SqlCommand("insert into Colors (Color) values (N'" + color.Color + "') SELECT SCOPE_IDENTITY() ", con.Simin);
            var id = cmd.ExecuteScalar();
            con.Simin.Close();
            return new JsonResult(new
            {
                message = "با موفقیت ثبت شد",
                type = "success",
                data = new { id = id, color = color.Color }
            });
        }

        [HttpPost("/api/EditColor")]
        public IActionResult EditColorActionResult([FromBody] Colors color)
        {
            if (color.Color == "")
            {
                return new JsonResult(new
                {
                    message = "مقدار ورودی خالی است",
                    type = "error",
                    data = new { }
                });
            }
            con.Simin.Open();
            var cmd = new SqlCommand("update Colors set Color = N'" + color.Color + "' " +
                                     "where Id = " + color.Id + " ", con.Simin);
            cmd.ExecuteNonQuery();
            con.Simin.Close();
            return new JsonResult(new
            {
                message = "با موفقیت ویرایش شد",
                type = "success",
                data = new { id = color.Id, color = color.Color }
            });
        }
    }
}
