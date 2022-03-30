export const getUrlTypes = (id) => {
    return {
        mostRecentPosts: 'search?searchBy=date&direction=desc&order=date&limit=3',
        mostLikedPosts : 'search?searchBy=titles&direction=desc&order=likes&limit=3',
        mostAnsweredPosts : 'search?searchBy=numAnswers&numAnswers=0&order=numAnswers&limit=3',
        mostViewedPosts : 'search?searchBy=content&order=views&limit=3',
        myPosts : `users/${id}/posts?page=1&limit=3`,
        myAnswers : `users/${id}/answers?page=1&limit=3`,
    }
}