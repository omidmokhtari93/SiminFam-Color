namespace SiminFam_Color.Controllers.AddNew
{
    public class Products
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Product { get; set; }
        public string TempCode { get; set; }
        public string FinalCode { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int Amount { get; set; }
        public string EnterDate { get; set; }
        public int CompanyId { get; set; }
        public string Company { get; set; }
        public decimal Price { get; set; }
        public string Comment { get; set; }
    }
}