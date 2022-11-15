using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server_app.Models.EDM;

namespace server_app.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;
        public TaskController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<t_task>>> Get()
        {
            return await _context.t_tasks.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<t_task>> Details(Guid id)
        {
            return await _context.t_tasks.FindAsync(id);
        }
        [HttpPost("update")]
        public async Task<ActionResult<t_task>> Update([FromBody] t_task task)
        {
            var temp = await _context.t_tasks.FindAsync(task.id_task);
            temp.title = task.title;
            temp.is_finish = task.is_finish;
            temp.description = task.description;
            temp.end_date_scheduled = task.end_date_scheduled;
            temp.end_date_actual = task.end_date_actual;

            await _context.SaveChangesAsync();

            return await _context.t_tasks.FindAsync(task.id_task);
        }
        [HttpPost("create")]
        public async Task<ActionResult<t_task>> Create([FromBody] t_task task)
        {
            var new_task = new t_task
            {
                id_task = task.id_task,
                title = task.title,
                is_finish = task.is_finish,
                description = task.description,
                end_date_scheduled = task.end_date_scheduled,
                end_date_actual = task.end_date_actual,
            };

            await _context.t_tasks.AddAsync(new_task);
            await _context.SaveChangesAsync();

            return await _context.t_tasks.FindAsync(task.id_task);
        }
        [HttpPost("delete/{id}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            var task = await _context.t_tasks.FindAsync(id);

            if(task == null) return null;

            _context.Remove(task);

            var result = await _context.SaveChangesAsync()>0;

            return result;
        }
    }
}