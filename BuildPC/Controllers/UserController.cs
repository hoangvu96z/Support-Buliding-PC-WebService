using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using BuildPC.Models;


namespace BuildPC.Controllers
{
    [RoutePrefix("api/user")]

    public class UserController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        //[HttpGet]
        //public IEnumerable<User> GetAllProduct()
        //{
        //    IList<User> proList = new List<User>();
        //    var query = (from prods in context.Users select prods).ToList();
        //    foreach (var item in query)
        //    {
        //        proList.Add(new User
        //        {
        //            MaUser = item.MaUser,
        //            Username = item.Username,
        //            Password = item.Password,
        //            PhanQuyen = item.PhanQuyen
                    
        //        });
        //    }
        //    return proList;
        //}

        //public IEnumerable<User> GetByID(string id)
        //{
        //    IList<User> proList = new List<User>();
        //    var query = (from prods in context.Users where prods.MaUser == id select prods).ToList();
        //    foreach (var item in query)
        //    {
        //        proList.Add(new User
        //        {
        //            MaUser = item.MaUser,
        //            Username = item.Username,
        //            Password = item.Password,
        //            PhanQuyen = item.PhanQuyen
        //        });
        //    }
        //    return proList;
        //}

        [HttpGet]
        [Route("login")]
        [BasicAuthentication]
        public HttpResponseMessage Get()
        {

            string username = Thread.CurrentPrincipal.Identity.Name;

            User user = new User();

            var query = (from prods in context.Users where prods.Username.ToLower() == username.ToLower() select prods).ToList();
            foreach (var item in query)
            {
                user = (new User
                {
                    MaUser = item.MaUser,
                    Username = item.Username,
                    Password = item.Password,
                    PhanQuyen = item.PhanQuyen
                });
            }

            if(user != null)
                return Request.CreateResponse(HttpStatusCode.OK, user);
            else
                return Request.CreateResponse(HttpStatusCode.NotFound);
        }
    }
}