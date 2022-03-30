export const getUrlTypes = (id) => {
    return {
        mostRecentPosts: 'search?searchBy=date&direction=desc&order=date&limit=5',
        mostLikedPosts : 'search?searchBy=titles&direction=desc&order=likes&limit=5',
        mostAnsweredPosts : 'search?searchBy=numAnswers&numAnswers=0&order=numAnswers&limit=5',
        mostViewedPosts : 'search?searchBy=content&order=views&limit=5',
        myPosts : `users/${id}/posts?page=1&limit=5`,
        myAnswers : `users/${id}/answers?page=1&limit=5`,
    }
}