using System;
using System.Net.Http;
using System.Net.Http.Headers;


namespace finalProject
{
    public class ApiRecipes
    {
        private const string URL = "https://api.spoonacular.com/recipes";
        private static string urlParameters = "?apiKey=52b9142911034ec3b82f8d31cb7410ca";
        //private static string urlParameters = "?apiKey=f49206d6e05d4dfdb0de78edf9b343c0";

        public static object SearchRecipe(string w)
        {
            HttpClient client = new HttpClient();
            string addParameters = "&query=" + w;
            client.BaseAddress = new Uri(URL + "/complexSearch");

            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters+addParameters).Result;

            return response.Content.ReadAsAsync<Object>().Result; ;
        }

        public static object GetRecipeById(string id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL + "/" + id + "/information");

            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters).Result;

            return response.Content.ReadAsAsync<Object>().Result;
        }

        public static dynamic GetRecipeIngredients(string id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL + "/" + id + "/ingredientWidget.json");

            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters).Result;

            return response.Content.ReadAsAsync<Object>().Result;
        }

        public static object GetRandom(int num)
        {
            HttpClient client = new HttpClient();
            string addParameters = "&number=" + num;
            client.BaseAddress = new Uri(URL + "/random");

            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters+addParameters).Result;

            return response.Content.ReadAsAsync<Object>().Result;
        }
    }
}
