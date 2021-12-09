let form = document.getElementById("form")
let search = document.getElementById("movie__search")
let movieReating = document.getElementById("movie__number")
let movieSelect = document.getElementById("movie__select")
let select2 = document.getElementById("movie__select2")
let button = document.getElementById("btn")

let list = document.getElementById("list")
let storage = window.localStorage
let bookMarked = JSON.parse(storage.getItem("book")) ?? []

// kinolarni render qilish
const moviRender = (arr) => {
    searchResult.textContent = arr.length 
    list.innerHTML = ""

    arr.forEach(function (item){
    let LI = document.createElement("li")
    LI.setAttribute("class", "list__item")
    LI.dataset.movieId = item.imdbId 

    let IMG = document.createElement("img")
    IMG.setAttribute("src", item.smallThumbnail)
    IMG.classList.add("list__img")
    LI.appendChild(IMG)

    let H4 = document.createElement("h4")
    H4.textContent = item.title
    H4.setAttribute("class", "list__head")
    LI.appendChild(H4)

    let NAV = document.createElement("nav")
    NAV.textContent = item.year
    NAV.setAttribute("class", "list__nav")
    LI.appendChild(NAV)

    let NUMBER = document.createElement("p")
    NUMBER.textContent = item.imdbRating
    NUMBER.classList.add("list__number")
    LI.appendChild(NUMBER)

    let BUTTON = document.createElement("a")
    BUTTON.textContent = "Watch trailer"
    BUTTON.href = "https://www.youtube.com/results?search_query=" + item.youtubeId
    BUTTON.setAttribute("target", "_blank")
    BUTTON.setAttribute("class", "btn btn-outline-primary button1")
    LI.appendChild(BUTTON)

    let BUTTON2 = document.createElement("button")
    BUTTON2.textContent = "Add bookmark"
    BUTTON2.setAttribute("class", "btn btn-outline-secondary button2")
    LI.appendChild(BUTTON2)
    BUTTON2.dataset.movieId = item.imdbId
    BUTTON2.dataset.type = "addbookmark"

    let BTN = document.createElement("button")
    BTN.textContent = "Bookmark"
    BTN.setAttribute("class", "btn btn-outline-success button3")
    LI.appendChild(BTN)
     

    let DIV = document.createElement("div")
    DIV.textContent = item.categories.join(", ")
    LI.appendChild(DIV)

    list.appendChild(LI)

})
}

moviRender(movies.slice(0, 20))

categories.forEach(item => {
    let option = document.createElement("option")
    option.setAttribute("class", "option")
    option.setAttribute("value", item)
    option.textContent = item

    movieSelect.appendChild(option) 
    
})

form.addEventListener("submit", e =>{
    e.preventDefault()

        
        let regex = new RegExp(search.value.trim(), "gi")
        let filterMovie = movies

        // sort by title
        if(search.value.length > 3){
            filterMovie = movies.filter(item => String(item.title).match(regex))
        }

        // sort by rating
        if (movieReating.value){
            filterMovie = filterMovie.filter(moviu => moviu.imdbRating >= Number(movieReating.value))
        }

        // sort by category
        if (movieSelect.value){
            if (movieSelect.value !== "All") {
            filterMovie = filterMovie.filter(moviu => moviu.categories.includes(movieSelect.value))
            } 
        }
        
        moviRender(filterMovie)
    
    // console.log(movieReating.value);
})

list.addEventListener("click",  e => {
    let movieId = e.srcElement.dataset.movieId

    if(e.srcElement.dataset.type == "addbookmark"){
        let findMovie = movies.find(movie => movie.imdbId = movieId)
            // console.log(findMovie);

            let movieData = {
                movieId : findMovie.imdbId,
                title: findMovie.title
            }

            if(bookMarked.findIndex(e => e.movieId == movieId) < 0){
                bookMarked.push(movieData)
            }else {
                alert("Bu kinoni qo'shib bo'lgansiz")
            }
            

            storage.setItem("book", JSON.stringify(bookMarked))
            let LIST = document.createElement("li")
            LIST.classList.add("list-group-item")

            let DIV2 = document.createElement("div")
            DIV2.textContent = movieData.title
            LIST.append(DIV2)
             
            let del = document.createElement("button")
            del.setAttribute("type", "button")
            del.setAttribute("class", "btn btn-danger btn-sm mt-2")
            del.textContent = "Remove"
            del.dataset.type = "delete"
            del.dataset.movieId = movieData.movieId 
            LIST.append(del)
            sidebarbookmarked.appendChild(LIST)

            del.addEventListener("click", () =>{
                LIST.remove()
            })
    }
    storage.clear()
})

btnlist.addEventListener("click", () => {
    sidebarbookmarked.remove()
})




