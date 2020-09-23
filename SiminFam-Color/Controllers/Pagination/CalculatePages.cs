﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using SiminFam_Color.Controllers.GetConnection;

namespace Anbargol_React.Controllers.Pagination
{
    public class Calculate
    {
        public GetConnction conn = new GetConnction();
        public ThisClass RowsAndPages(string table, int rowsInPage)
        {
            conn.Simin.Open();
            var cmd = new SqlCommand("select count(*) from " + table, conn.Simin);
            var rows = Convert.ToDecimal(cmd.ExecuteScalar());
            conn.Simin.Close();
            return new ThisClass()
            {
                Rows = rowsInPage == 0 ? rows : rowsInPage,
                Pages = Math.Ceiling(rows / (rowsInPage == 0 ? rows : rowsInPage))
            };
            
        }
    }

    public class ThisClass
    {
        public decimal Rows { get; set; }
        public decimal Pages { get; set; }
    }
}