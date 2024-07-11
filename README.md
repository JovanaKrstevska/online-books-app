# Online Books App
## The Search Functionality:
```javascript
const handleChangeSearchBook = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClickSearch = () => {
        const filtered = [];

        mergedBooks.forEach(book => {
            if ((book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase())) || 
                (book.title && book.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
                (book.genre && book.genre.toLowerCase().includes(searchQuery.toLowerCase()))){
                filtered.push(book);
            }
        });
        setFilteredBooks(filtered);
        setCurrentPage(1);
    };
```
Here as we can see the handleChangeSearchBook function, his purpise is to grab the value from the Search Bar witch I've created a component and based on the value that the user put it, it lists only the books that contains that value whatever is by auther, by title or by genre. In the function `filtered` is an empty array that it will contain only the books who has that value. 
