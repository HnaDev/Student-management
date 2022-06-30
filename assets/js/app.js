  // line nav
  let menuItem = document.querySelectorAll(".menu-item");
  menuItem.forEach((item) => item.addEventListener("mouseover", hoverLink));
  let line = document.createElement("div"); 
  line.className = "line-effect"; 
  document.body.appendChild(line);

  function hoverLink(e) {
    const { left, top, width, height } = e.target.getBoundingClientRect(); //// lấy ra vị trí tọa độ
    line.style.width = `${width}px`;
    line.style.left = `${left}px`;
    line.style.top = `${top + height}px`;
  }
  const menu = document.querySelector(".menu");
  menu.addEventListener("mouseleave", function () {
    line.style.width = 0;
  });
  ////////////////////////////////////////////////
  var danhsachsinhvien = [];
  var button = document.querySelector(".btn");
  button.addEventListener("click", handleButton);


  function handleButton() {
    var studentId = document.getElementById("studentId").value;
      //////// kiểm tra giới tính
      var gender = []; 
      if(document.getElementById("male").checked){
          gender = document.getElementById("male").value;
      } else if(document.getElementById("famale")){
          gender = document.getElementById("famale").value;
      }
  /////////// end kiểm tra giới tính    

    if(studentId){
      var index = danhsachsinhvien.findIndex((i) => {
        return i.id ==  studentId;
    });
      danhsachsinhvien[index].hoVaTen = document.querySelector(".studentName").value;
      danhsachsinhvien[index].email = document.querySelector(".studentEmail").value;
      danhsachsinhvien[index].soDienThoai = document.querySelector(".studentPhone").value;
      danhsachsinhvien[index].queQuan = document.querySelector(".studentAddress").value;
      danhsachsinhvien[index].gioiTinh = gender;
      danhsachsinhvien[index].ngaySinh = document.querySelector(".studentDate").value;
      danhsachsinhvien[index].note = document.querySelector(".studentNote").value
    }
    else{
      var id = 0;
      if(danhsachsinhvien.length == 0){  //// kiểm tra sản phẩm đầu tiên thì cho id là 1
        id = 1;
      }else{ //// không phải sản phẩm đầu tiên, lấy id cuối +1
        id = findMaxId() +1;
      }
      var danhsach = {
        id : id,
        hoVaTen: document.querySelector(".studentName").value,
        email: document.querySelector(".studentEmail").value,
        soDienThoai: document.querySelector(".studentPhone").value,
        queQuan: document.querySelector(".studentAddress").value,
        gioiTinh : gender,
        ngaySinh: document.querySelector(".studentDate").value,
        note: document.querySelector(".studentNote").value,
      };
      danhsachsinhvien.push(danhsach);
    }
    renderProductTable()
 
  }
  

  //// tìm phần tử có id lớn nhất
function findMaxId(){
  var max = 0;
  danhsachsinhvien.forEach(item => { //// đại diện cho từng phần tử
      if(item.id > max) //// và trỏ đến id , nếu id > max
      max = item.id; //// thì max = id
  })
  return max;
}

  function renderProductTable(){ //// tối ưu hóa code
    document.getElementById("tableBody").innerHTML = ""
    for (let index = 0; index < danhsachsinhvien.length; index++) {
        document.getElementById("tableBody").innerHTML +=
    `<tr>
        <th>${index + 1}</th>
        <td>${danhsachsinhvien[index].hoVaTen}</td>
        <td>${danhsachsinhvien[index].email}</td>
        <td>${danhsachsinhvien[index].soDienThoai}</td>
        <td>${danhsachsinhvien[index].queQuan}</td>
        <td>${danhsachsinhvien[index].gioiTinh}</td>
        <td>${danhsachsinhvien[index].ngaySinh}</td>
        <td>${danhsachsinhvien[index].note}</td>
        <td class="">
            <button class="btn btn-outline-primary" onclick=moreStudent(${danhsachsinhvien[index].id})>Sửa</button>
          <button class="btn btnDelete btn-outline-danger" onclick=handleDelete(${danhsachsinhvien[index].id})>Xoá</button>
        </td>
    </tr>`
    }
  }
  //////////////////// === xóa ==== ////////////////
  function handleDelete(id){
    var index = danhsachsinhvien.findIndex((i) => i.id == id); //// tìm ra index phần tử cần xóa 
    danhsachsinhvien.splice(index,1); 
    renderProductTable();
  }
  function moreStudent(id){
    var index = danhsachsinhvien.findIndex((i) => i.id == id); //// tìm ra index phần tử cần xóa 
    var danhsach = danhsachsinhvien[index];
      document.querySelector(".studentName").value = danhsach.hoVaTen;
      document.querySelector(".studentEmail").value = danhsach.email;
      document.querySelector(".studentPhone").value = danhsach.soDienThoai;
      document.querySelector(".studentAddress").value = danhsach.queQuan;
      gender = danhsach.gioiTinh;
      document.querySelector(".studentDate").value = danhsach.ngaySinh;
      document.querySelector(".studentNote").value = danhsach.note;
      document.getElementById("studentId").value = danhsach.id 

  }
  document.addEventListener("contextmenu", event => event.preventDefault()
    ); //// chặn dùng chuột phải
  document.addEventListener("keydown", function (event){ ////// chặn f12
    if (event.ctrlKey){
       event.preventDefault();
    }
    if(event.keyCode == 123){
       event.preventDefault();
    }
});
