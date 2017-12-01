$(document).ready(function() {
    //to create a multi line string use ` (backticks)
    const JsonData = `{"thumbnails": [
                    {
                        "title":"some random title will be for this post",
                        "imgURL":"images/img1.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "authorJob": "Games Tech Lecturer",
                        "profilePic":"images/profile.jpg",
                        "likes":"30",
                        "comments": "15"
                    },
                     {
                        "title":"another random title will be for this post too",
                        "imgURL":"images/img2.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "profilePic":"images/profile.jpg",
                        "likes":"45",
                        "comments": "12"
                    },
                     {
                        "title":"some really random title here again",
                        "imgURL":"images/img3.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "authorJob": "Games Tech Lecturer",
                        "profilePic":"images/profile.jpg",
                        "likes":"22",
                        "comments": "7"
                    },
                     {
                        "title":"some really really random title will be here",
                        "imgURL":"images/img4.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "authorJob": "Games Tech Lecturer",
                        "profilePic":"images/profile.jpg",
                        "likes":"50",
                        "comments": "18"
                    },
                     {
                        "title":"some random title will be for this post",
                        "imgURL":"images/img5.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "authorJob": "Games Tech Lecturer",
                        "profilePic":"images/profile.jpg",
                        "likes":"32",
                        "comments": "11"
                    },
                     {
                        "title":"some random title will be for this post",
                        "imgURL":"images/img6.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "authorJob": "Games Tech Lecturer",
                        "profilePic":"images/profile.jpg",
                        "likes":"28",
                        "comments": "16"
                    },
                     {
                        "title":"some random title will be for this post",
                        "imgURL":"images/img7.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "authorJob": "Games Tech Lecturer",
                        "profilePic":"images/profile.jpg",
                        "likes":"62",
                        "comments": "17"
                    },
                     {
                        "title":"some random title will be for this post",
                        "imgURL":"images/img8.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "authorJob": "Games Tech Lecturer",
                        "profilePic":"images/profile.jpg",
                        "likes":"53",
                        "comments": "14"
                    },
                     {
                        "title":"some random title will be for this post",
                        "imgURL":"images/img9.jpeg",
                        "blogURL":"http://blogspot.com/",
                        "author":"Jaewoong Yu",
                        "authorJob": "Games Tech Lecturer",
                        "profilePic":"images/profile.jpg",
                        "likes":"44",
                        "comments": "13"
                    }
                ]
            }`;

    //parse the json string to a javascript object
    let data = JSON.parse(JsonData);

    //the array is stored in data.thumbnails
    //for each elelemnt of the array
    data.thumbnails.forEach(function(thumb) {

        //clone the thumbnail code
        $clone = $("#thumb").clone();

        //modify the cloned thumb to add the data from json object
        $clone.find("#thumbTitle").text(thumb.title);
        $clone.find("#thumbImage").attr("src", thumb.imgURL);
        $clone.find("#thumbTitle").attr("href", thumb.blogURL);
        $clone.find("#authorName1").text(thumb.author);
        $clone.find("#authorName2").text(thumb.author);
        $clone.find("#authorJob").text(thumb.authorJob);
        $clone.find("#authorPic").attr("src", thumb.profilePic);
        $clone.find("#likesNumber").text(thumb.likes);
        $clone.find("#commentsNumber").text(thumb.comments);

        //append the cloned tag to the thumbnail container
        $("#thumbsContainer").append($clone);
        console.log(1);

    });

    //lastly hide the thumb html code template
    $("#thumb").hide();

    return false;

});