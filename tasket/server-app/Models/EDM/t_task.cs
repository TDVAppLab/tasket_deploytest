using System;

#nullable enable

namespace server_app.Models.EDM
{
    public partial class t_task
    {
        public Guid id_task { get; set; }
        public string title { get; set; }
        public bool is_finish { get; set; }
        public string? description { get; set; }
        public DateTime? end_date_scheduled { get; set; }
        public DateTime? end_date_actual { get; set; }
    }
}