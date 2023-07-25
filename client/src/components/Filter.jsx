import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filteredBurgersAction } from "../actions/burgerActions";

function Filter() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("hepsi");

  const filterHandler = () => {
    dispatch(filteredBurgersAction(searchValue, category));
  };

  return (
    <div>
      <div className="d-flex container my-2">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Aranacak Menüyü Giriniz"
          className="form-control border-warning text-danger "
        />

        <select
          name=""
          id=""
          className="form-select w-50 mx-2 border-warning text-danger "
          placeholder="Kategori Seçiniz"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="0" disabled>
            Kategori Seçiniz
          </option>
          <option value="et">Et</option>
          <option value="tavuk">Tavuk</option>
          <option value="hepsi">Hepsi</option>
        </select>

        <button className="btn btn-danger w-50" onClick={filterHandler}>
          Filtrele!
        </button>
      </div>
    </div>
  );
}

export default Filter;
