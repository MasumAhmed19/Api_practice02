const loadAllPosts = async (category) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category?`${category}`:''}`)
    const data = await response.json();
    displayPosts(data.posts)
}


const displayPosts = (posts) =>{
    const postsColumn = document.getElementById('postsColumn')
    
    postsColumn.innerHTML =""

    posts.forEach((el) => {
       const singleDiv = document.createElement('div')
       singleDiv.classList.add("flex", "gap-3", "bg-[#F3F3F4]", "p-9", "rounded-lg", "mb-7")
       
       singleDiv.innerHTML = `
            <div class="relative">
                            <i class="absolute right-0 top-0 ${el.isActive?"text-green-500" : " text-red-500"} ri-circle-fill"></i>
                            <img class="w-[100px] h-[100px] object-cover" src=${el.image} alt="">
                        </div>

                        
                        <div class="flex flex-col grow gap-3">

                            <div class="flex gap-4">
                                <h2 class="text-lg ">#${el.category}</h2>
                                <h2 class="text-lg ">Author : ${el.author.name}</h2>
                            </div>

                            <h2 class="text-xl font-bold">${el.title}</h2>
                            <p class="text-lg">${el.description}</p>
                            <div class="border-[1px] border-dashed border-gray-400"></div>

                            <div class="flex flex-row justify-between text-xl text-gray-700">
                                <div class="flex flex-row gap-4">
                                    <i class="ri-message-3-fill"> ${el.comment_count}</i>
                                    <i class="ri-eye-line"> ${el.view_count}</i>
                                    <i class="ri-timer-2-line "> ${el.posted_time} min</i>
                                </div>
                                <button onclick="loadCounter('${el.title}', ${el.view_count})">
                                <i class="ri-inbox-archive-fill"></i></button>
                            </div>

            </div>
       `
       postsColumn.append(singleDiv)
    })
}

const loadCounter = (title, views) =>{
    const postArchiveColumn = document.getElementById('postArchiveColumn')
    console.log(title, views)

    const div = document.createElement('div')
    div.classList.add("bg-white", "flex", "justify-between", "items-center", "p-5", "rounded-lg", "mt-5")

    div.innerHTML=`
        <h2 class="text-xl font-semibold w-3/4">${title}</h2>
        <i class="ri-eye-fill text-lg text-[#717181]"></i>
        <h2 class="text-lg ">${views}</h2>
    `
    postArchiveColumn.append(div)

    const readCount = document.getElementById('readCount')
    
    const readCountValue = parseInt(readCount.innerText)
    const sum = readCountValue + 1

    document.getElementById('readCount').innerText = sum
}


const handleSearch = () =>{
    const searchPosts = document.getElementById('searchPosts').value
    loadAllPosts(searchPosts)
    //console.log(searchPosts)
}



loadAllPosts()
