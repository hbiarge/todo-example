using System;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace TodosApp.Models
{
    public class Todo
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        public bool Done { get; set; }
    }
}