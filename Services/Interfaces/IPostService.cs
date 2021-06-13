using ChatAngularProject.Models.Db;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAngularProject.Services.Interfaces
{
    public interface IPostService
    {
        Task<bool> DeleteAsync(int postID);
        Task<Post> GetAsync(int postID);
        Task<IEnumerable<Post>> GetAllPosts();
        Task<bool> EditAsync(Post post);
        Task<int> CountChanelPostAsync(int chanelID);
    }
}
