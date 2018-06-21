using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Description;
using BuildPC.Models;

namespace BuildPC.Controllers
{

    public class UserController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        [HttpGet]
        public IEnumerable<User> GetAllProduct()
        {
            IList<User> proList = new List<User>();
            var query = (from prods in context.Users select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new User
                {
                    MaUser = item.MaUser,
                    Username = item.Username,
                    Password = item.Password,
                    PhanQuyen = item.PhanQuyen
                    
                });
            }
            return proList;
        }

        public IEnumerable<User> GetByID(string id)
        {
            IList<User> proList = new List<User>();
            var query = (from prods in context.Users where prods.MaUser == id select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new User
                {
                    MaUser = item.MaUser,
                    Username = item.Username,
                    Password = item.Password,
                    PhanQuyen = item.PhanQuyen
                });
            }
            return proList;
        }
        [Route("api/login")]
        public HttpResponseMessage Get()
        {
            string username = Thread.CurrentPrincipal.Identity.Name;

            switch(username.ToLower())
            {
                case "admin":
                    return Request.CreateResponse(HttpStatusCode.OK, context.Users.Where(e => e.Username.ToLower() == "admin").ToList());
                case "user":
                    return Request.CreateResponse(HttpStatusCode.OK, context.Users.Where(e => e.Username.ToLower() == "user").ToList());
                default:
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}