using System.Data.SqlClient;

namespace SiminFam_Color.Controllers.GetConnection
{
    public class GetConnction
    {
        public SqlConnection Simin;

        public GetConnction()
        {
            Simin = new SqlConnection(connectionString: "Data Source=.;Initial Catalog=SiminFamColor;Integrated Security=True");
        }
    }
}
