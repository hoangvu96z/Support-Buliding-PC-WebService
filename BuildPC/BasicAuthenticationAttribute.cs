using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading;
using System.Security.Principal;

namespace BuildPC
{
    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if(actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            else
            {
                string authenticationToken = actionContext.Request.Headers.Authorization.Parameter;
                string decode = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationToken));
                string[] UsernamePasswordArray = decode.Split(':');
                string Username = UsernamePasswordArray[0];
                string Password = UsernamePasswordArray[1];


                if(Security.Login(Username,Password))
                {
                    Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(Username),null);
                }
                else
                {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                }
            }
            base.OnAuthorization(actionContext);
        }
    }
}