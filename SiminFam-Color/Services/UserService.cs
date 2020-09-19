using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SiminFam_Color.Controllers.GetConnection;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
    }

    public class UserService : IUserService
    {
        public GetConnction con = new GetConnction();
        

        public async Task<User> Authenticate(string username, string password)
        {
            con.Simin.Open();
            var user = new User();
            var cmd = new SqlCommand("Select * from Users where Username = @Username and Password = @Password", con.Simin);
            cmd.Parameters.AddWithValue("@Username", username);
            cmd.Parameters.AddWithValue("@Password", password);
            var rd = cmd.ExecuteReader();
            if (rd.Read())
            {
                user.FullName = rd["FullName"].ToString();
                user.Username = rd["Username"].ToString();
            }
            else
            {
                user = null;
            }
            con.Simin.Close();
            return user;
        }
    }
}