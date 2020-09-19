using System.Data.SqlClient;
using Microsoft.AspNetCore.Authorization;

namespace SiminFam_Color.Controllers.GetConnection
{
    [Authorize]
    public class GetConnction
    {
        public SqlConnection Simin;

        public GetConnction()
        {
            Simin = new SqlConnection(connectionString: "Data Source=.;Initial Catalog=SiminFamColor;Integrated Security=True");
        }
    }
}
