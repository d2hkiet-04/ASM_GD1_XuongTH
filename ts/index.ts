const URL_API = `http://localhost:3000`;
type TLoaiSP = { id: number; ten_loai: string; thu_tu: number };
type TSanPham = {
  id: number;
  ten_sp: string;
  gia: number;
  gia_km: number;
  hinh: string;
};

export const lay_loai = async () => {
  let loai_arr: TLoaiSP[] = await fetch(URL_API + "/loai")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
  let kq = ``;
  loai_arr.forEach((loai) => {
    kq += `<li> <a href="sp_theo_loai.html?id=${loai.id}">${loai.ten_loai}</a> </li>`;
  });

  console.log(loai_arr);
  return kq;
};

export const lay_ten_loai = async (id: number) => {
  let loai: TLoaiSP;
  try {
    loai = await fetch(URL_API + `/loai/${id}`).then((res) => res.json());
  } catch (err) {
    return `Không có .  (Không có loại ${id})`;
  }
  return `${loai.ten_loai}`;
};

export const code_mot_sp = (sp) => {
  return `
    <div class="sp">
        
        <img src="${sp.hinh}">
        <h3>${sp.ten_sp}</h3>
        <div class ="goc">
        <p >Giá gốc: ${Number(sp.gia).toLocaleString("vi")}</p>
        </div>
        <div class="discount">
        <p class="disscount">Khuyến mãi: ${Number(sp.gia_km).toLocaleString(
          "vi"
        )}</p>
        <a href="">
            <i class="bi bi-cart"></i>
          </a>
          </div>     
    </div>
  `;
  // <p>Cập nhật: ${new Date(sp.ngay).toLocaleDateString("vi")}</p>
};

export const lay_sp = async (so_sp) => {
  //async che do hoat dong bat dong bo
  let sp_arr: TSanPham[];
  sp_arr = await fetch(`${URL_API}/san_pham?_sort=-ngay&_limit=${so_sp}`)
    .then((res) => res.json())
    .then((data) => data);
  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};
export const lay_sp_trong_loai = async (id) => {
  //async che do hoat dong bat dong bo
  let sp_arr: TSanPham[];
  sp_arr = await fetch(URL_API + `/san_pham?id_loai=${id}`).then((res) =>
    res.json()
  );

  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};
export const sp_noi_bat = async (so_sp) => {
  //async che do hoat dong bat dong bo
  let sp_arr: TSanPham[];
  sp_arr = await fetch(URL_API + `/san_pham?hot=1&_limit=${so_sp}`)
    .then((res) => res.json())
    .then((data) => data);
  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};
export const sp_ban_chay = async (so_sp) => {
  //async che do hoat dong bat dong bo
  let sp_arr: TSanPham[];
  sp_arr = await fetch(URL_API + `/san_pham?ban_chay=1&_limit=${so_sp}`)
    .then((res) => res.json())
    .then((data) => data);
  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};
