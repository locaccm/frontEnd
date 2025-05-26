import React, { useState } from "react";
import { Plus } from "lucide-react";
import PropertyFormModal from "./components/PropertyFormModal.js";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal.js";
import HousingTable from "./components/housingTable.js";
import { Property } from "./interfaces/property.interface.js";
import { initialProperties } from "./data/fakedata.js";
import { Button } from "./components/ui/button.js";
import "./styles/WealthManagement.css";

export default function HousingManagement() {
  // State for property list, editing, deleting, and form handling
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    rent: "",
    surface: "",
    rooms: "",
  });

  // Update form state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({ title: "", address: "", rent: "", surface: "", rooms: "" });
  };

  // Add a new property to the list
  const handleAdd = () => {
    const newProperty: Property = {
      id: Date.now(),
      title: formData.title,
      address: formData.address,
      rent: Number(formData.rent),
      surface: Number(formData.surface),
      rooms: Number(formData.rooms),
    };
    setProperties([...properties, newProperty]);
    setShowAddForm(false);
    resetForm();
  };

  // Edit an existing property
  const handleEdit = () => {
    if (!editingProperty) return;

    const updated: Property = {
      ...editingProperty,
      title: formData.title,
      address: formData.address,
      rent: Number(formData.rent),
      surface: Number(formData.surface),
      rooms: Number(formData.rooms),
    };

    setProperties(properties.map((prop) => (prop.id === updated.id ? updated : prop)));
    setEditingProperty(null);
    resetForm();
  };

  // Delete a property from the list
  const handleDelete = () => {
    if (!deletingProperty) return;
    setProperties(properties.filter((prop) => prop.id !== deletingProperty.id));
    setDeletingProperty(null);
  };

  return (
    <div className="container">
      <h2>Property Management</h2>

      {/* Button to open the Add Property form */}
      <Button className="button primary" onClick={() => setShowAddForm(true)}>
        <Plus className="w-4 h-4" />
        Ajouter un bien
      </Button>

      {/* Table showing current properties with Edit and Delete actions */}
      <HousingTable
        properties={properties}
        onEdit={(prop) => {
          setEditingProperty(prop);
          setFormData({
            title: prop.title,
            address: prop.address,
            rent: String(prop.rent),
            surface: String(prop.surface),
            rooms: String(prop.rooms),
          });
        }}
        onDelete={setDeletingProperty}
      />

      {/* Modal for adding or editing a property */}
      {(showAddForm || editingProperty) && (
        <PropertyFormModal
          isEditing={!!editingProperty}
          formData={formData}
          onChange={handleChange}
          onClose={() => {
            setShowAddForm(false);
            setEditingProperty(null);
            resetForm();
          }}
          onSubmit={editingProperty ? handleEdit : handleAdd}
        />
      )}

      {/* Modal for confirming property deletion */}
      {deletingProperty && (
        <DeleteConfirmationModal
          title={deletingProperty.title}
          onCancel={() => setDeletingProperty(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
