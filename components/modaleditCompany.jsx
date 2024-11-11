import React, { useState } from "react";
import axios from "axios";

export default function ModalEditCompany({ companyId, companyData, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: companyData.name || "",
    address: companyData.address || "",
    phone: companyData.phone || "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/company/update_company/${companyId}`, formData);
      onUpdate(); 
      onClose(); 
    } catch (error) {
      console.error("Erro ao atualizar a empresa:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Empresa</h2>
        <form>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Endereço:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
        
        </form>
        <button onClick={handleUpdate}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
