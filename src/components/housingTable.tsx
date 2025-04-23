import { Button } from "../components/ui/button.js";
import { Pencil, Trash2 } from "lucide-react";
import { HousingTableProps } from "../interfaces/property.interface.js";

/**
 * HousingTable
 * 
 * This component displays a list of properties in a table format.
 * It provides action buttons to edit or delete each property.
 */
export default function HousingTable({ properties, onEdit, onDelete }: HousingTableProps) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Adresse</th>
                    <th>Loyer</th>
                    <th>Surface</th>
                    <th>Pièces</th>
                    <th>Locataire</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {properties.map((prop) => (
                <tr key={prop.id}>
                    <td>{prop.title}</td>
                    <td>{prop.address}</td>
                    <td>{prop.rent} €</td>
                    <td>{prop.surface} m²</td>
                    <td>{prop.rooms}</td>
                    <td>{prop.locataire}</td>
                    <td>
                        <Button className="button outline" onClick={() => onEdit(prop)}>
                            <Pencil />
                            Modifier
                        </Button>
                        <Button className="button destructive" onClick={() => onDelete(prop)}>
                            <Trash2 />
                            Supprimer
                        </Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}
