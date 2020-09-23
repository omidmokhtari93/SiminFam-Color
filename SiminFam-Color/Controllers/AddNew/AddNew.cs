using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Anbargol_React.Controllers.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SiminFam_Color.Controllers.GetConnection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SiminFam_Color.Controllers.AddNew
{
    [Authorize]
    [Route("api/[controller]")]
    public class AddNew : Controller
    {
        public Calculate calculate = new Calculate();
        public GetConnction con = new GetConnction();

        [HttpGet("/api/GetProducts")]
        public IActionResult GetColorsEntryActionResult(int rowsInPage, string key = "", int pageNumber = 1)
        {
            con.Simin.Open();
            var rowsAndPages = calculate.RowsAndPages("AddNewColor", rowsInPage);
            var cmd = new SqlCommand("select * from(select ROW_NUMBER() over(order by main.Id) as rn , * from " +
                                     "(SELECT AddNewColor.Id, AddNewColor.[Type] as ProductId," +
                                     " AddNewColor.Color as ColorId ,AddNewColor.Company as CompanyId, Products.Product, " +
                                     "TempCode, FinalCode, Colors.Color, " +
                                     "Amount, EnterDate, Companies.Company, Price FROM AddNewColor " +
                                     "inner join Colors on AddNewColor.Color = Colors.id " +
                                     "inner join Companies on AddNewColor.Company = Companies.id " +
                                     "inner join Products on AddNewColor.[Type] = Products.id)main) hasRN " +
                                     (key == null ?
                                         (" where hasRN.rn > ((" + pageNumber + " - 1) * " + rowsAndPages.Rows + ") " +
                                          " and hasRN.rn <= (" + pageNumber + " * " + rowsAndPages.Rows + ")") :
                                         (" where (hasRN.TempCode like N'%" + key + "%' or '" + key + "' = '') " +
                                          " or (hasRN.FinalCode like N'%" + key + "%' or '" + key + "' = '') ")) + "" +
                                     " order by hasRN.Id desc", con.Simin);
            var rd = cmd.ExecuteReader();
            var colorsEntryList = new List<Products>();
            while (rd.Read())
            {
                colorsEntryList.Add(new Products()
                {
                    Id = Convert.ToInt32(rd["Id"]),
                    Product = rd["Product"].ToString(),
                    ProductId = Convert.ToInt32(rd["ProductId"]),
                    Color = rd["Color"].ToString(),
                    ColorId = Convert.ToInt32(rd["ColorId"]),
                    TempCode = rd["TempCode"].ToString(),
                    FinalCode = rd["FinalCode"].ToString(),
                    Amount = Convert.ToInt32(rd["Amount"]),
                    EnterDate = rd["EnterDate"].ToString(),
                    Company = rd["Company"].ToString(),
                    CompanyId = Convert.ToInt32(rd["CompanyId"]),
                    Price = Convert.ToDecimal(rd["Price"]),
                });
            }
            con.Simin.Close();
            return Json(new
            {
                rows = colorsEntryList,
                pagesCount = rowsAndPages.Pages
            });
        }

        [HttpPost("/api/AddNewProduct")]
        public IActionResult AddNewProductActionResult([FromBody] Products add)
        {
            con.Simin.Open();
            var cmd = new SqlCommand("insert into AddNewColor (Type , TempCode , FinalCode , Color , Amount ," +
                                     "EnterDate , Company ,Price , Comment) values(" + add.ProductId + " " +
                                     ", '" + add.TempCode + "' , '" + add.FinalCode + "'," +
                                     "" + add.ColorId + ", " + add.Amount + " , '" + add.EnterDate + "' " +
                                     ", " + add.CompanyId + " , " + add.Price + " , N'" + add.Comment + "')", con.Simin);
            cmd.ExecuteNonQuery();
            con.Simin.Close();
            return Json(new
            {
                message = "با موفقیت ثبت شد",
                type = "success",
                data = new { }
            });
        }

        [HttpPost("/api/EditProduct")]
        public IActionResult EditProductEntryActionResult([FromBody] Products add)
        {
            con.Simin.Open();
            var cmd = new SqlCommand("insert into AddNewColor (Type , TempCode , FinalCode , Color , Amount ," +
                                     "EnterDate , Company ,Price , Comment) values(" + add.ProductId + " " +
                                     ", '" + add.TempCode + "' , '" + add.FinalCode + "'," +
                                     "" + add.ColorId + ", " + add.Amount + " , '" + add.EnterDate + "' " +
                                     ", " + add.CompanyId + " , " + add.Price + " , N'" + add.Comment + "')", con.Simin);
            cmd.ExecuteNonQuery();
            con.Simin.Close();
            return Json(new
            {
                message = "با موفقیت ثبت شد",
                type = "success",
                data = new { }
            });
        }
    }
}
