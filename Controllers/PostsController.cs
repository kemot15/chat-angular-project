using ChatAngularProject.Context;
using ChatAngularProject.Models.Db;
using ChatAngularProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAngularProject.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class PostsController : ControllerBase
        {
            private readonly IPostService postService;
            private readonly AngularProjectContext _context;

            public PostsController(AngularProjectContext context)
            {
                _context = context;
            }

            //public PostsController(IPostService postService)
            //{
            //    this.postService = postService;
            //}
            // GET: api/Posts
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
            {
                return await _context.Posts.ToListAsync();
            }

            // GET: api/Posts/5
            [HttpGet("{id}")]
            public async Task<ActionResult<Post>> GetPost(int id)
            {
                var post = await _context.Posts.FindAsync(id);

                if (post == null)
                {
                    return NotFound();
                }

                return post;
            }

            // PUT: api/Posts/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut("{id}")]
            public async Task<IActionResult> PutPost(int id, Post post)
            {
                if (id != post.Id)
                {
                    return BadRequest();
                }

                _context.Entry(post).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PostExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // POST: api/Posts
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
            public async Task<ActionResult<Post>> PostPost(Post post)
            {
                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPost", new { id = post.Id }, post);
            }

            // DELETE: api/Posts/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeletePost(int id)
            {
                var post = await _context.Posts.FindAsync(id);
                if (post == null)
                {
                    return NotFound();
                }

                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            private bool PostExists(int id)
            {
                return _context.Posts.Any(e => e.Id == id);
            }
        }
}
