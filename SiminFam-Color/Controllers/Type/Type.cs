﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SiminFam_Color.Controllers.GetConnection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SiminFam_Color.Controllers.Product
{
    [Authorize]
    [Route("api/[controller]")]
    public class Product : Controller
    {
        public GetConnction con = new GetConnction();
        [HttpGet("/api/GetTypes")]
        public IActionResult GetProductsActionResult()
        {
            con.Simin.Open();
            var products = new List<Types>();
            var cmd = new SqlCommand("select * from Products", con.Simin);
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                products.Add(new Types()
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

        [HttpPost("/api/SaveTypes")]
        public IActionResult SaveProductActionResult([FromBody] Types product)
        {
            if (product.Product == "")
            {
                return Json(new
                {
                    message = "مقدار ورودی خالی است",
                    type = "error",
                    data = new { }
                });
            }
            con.Simin.Open();
            var cmd = new SqlCommand("insert into Products (Product) values (N'" + product.Product + "') SELECT SCOPE_IDENTITY() ", con.Simin);
            var id = cmd.ExecuteScalar();
            con.Simin.Close();
            return Json(new
            {
                message = "با موفقیت ثبت شد",
                type = "success",
                data = new { id = id, product = product.Product }
            });
        }

        [HttpPost("/api/EditTypes")]
        public IActionResult EditProductActionResult([FromBody] Types product)
        {
            if (product.Product == "")
            {
                return Json(new
                {
                    message = "مقدار ورودی خالی است",
                    type = "error",
                    data = new { }
                });
            }
            con.Simin.Open();
            var cmd = new SqlCommand("update Products set Product = N'" + product.Product + "' " +
                                     "where Id = " + product.Id + " ", con.Simin);
            cmd.ExecuteNonQuery();
            con.Simin.Close();
            return Json(new
            {
                message = "با موفقیت ویرایش شد",
                type = "success",
                data = new { id = product.Id, product = product.Product }
            });
        }
    }
}
