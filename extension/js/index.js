// singer data store in api npoint
fetch("https://api.npoint.io/05d24548da9af9b22e77")
.then((response) => response.json())
.then((json) => {
  var allSingerList = json;
  
  const singerTag = document.querySelectorAll(".singer_tag__item");
  
  // This block will add a class to the selected singerTag, so it will highlight the click element but remove the previous click element class
  
  singerTag.forEach((ele) => {
    ele.addEventListener("click", (event) => {
      var parent = ele.parentNode;
      var children = parent.children;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        child.classList.contains("singer_tag__item--select");
        child.classList.remove("singer_tag__item--select");
      }
      ele.classList.add("singer_tag__item--select");
      selectedTags();
    });
  });
  
  // this block get all the selected tag
    var selectedTags = () => {
      const selectedTag = document.querySelectorAll(
        ".singer_tag__item--select"
      );
      const filter = {};

      selectedTag.forEach((ele) => {
        var parent = ele.parentNode;
        filter[parent.id] = ele.innerHTML;
      });

      allSingerList.forEach((ele) => {
        if (
          ele.title.includes(filter.language) &&
          ele.title.includes(filter.categories) &&
          ele.alphabet.includes(filter.alphabet)
        ) {
          // if matches the filter, do something
          // clear the singer list
          var singer_name = document.querySelector("#singer_name");
          singer_name.innerHTML = "";

          // add all name to list
          var singerNameList = ele.names;
          singerNameList.forEach((name) => {
            var html =
              '<li class="singer_list_txt__item"><a class="singer_list_txt__link js_singer" title="' +
              name +
              '" href="https://www.youtube.com/results?search_query=' +
              name +
              '" target="_blank" rel="noopener noreferrer">' +
              name +
              "</a></li>";
            singer_name.innerHTML += html;
          });
        }
      });
    };
    selectedTags();
  });

//   fetch("../json/singers.json")
//   .then((response) => response.json())
//   .then((json) => {
//     json.forEach((ele) => {
//       if (ele.title == "华语女歌手") {
//         console.log(ele.alphabet);
//       }
//     });
//   });
