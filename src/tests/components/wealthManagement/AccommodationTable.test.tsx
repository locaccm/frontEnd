import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccommodationTable from "../../../components/wealthManagement/AccommodationTable.js";
import { vi } from "vitest";

vi.mock("../../../hooks/wealthManagement/useAccommodationActions", () => ({
  useAccommodationActions: () => ({
    fetchAccommodations: vi.fn().mockResolvedValue([
      {
        ACCN_ID: 1,
        ACCC_NAME: "Appartement Paris",
        ACCC_TYPE: "Studio",
        ACCC_ADDRESS: "123 Rue Lafayette",
        ACCC_DESC: "Vue sur la tour Eiffel",
        ACCB_AVAILABLE: true,
      },
    ]),
  }),
}));

describe("AccommodationTable", () => {
  it("display accommodation and use callbacks", async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onCreate = vi.fn();

    render(
      <AccommodationTable onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} />
    );

    await waitFor(() => {
      expect(screen.getByText("Appartement Paris")).toBeInTheDocument();
    });

    expect(screen.getByText("Studio")).toBeInTheDocument();
    expect(screen.getByText("123 Rue Lafayette")).toBeInTheDocument();
    expect(screen.getByText("Vue sur la tour Eiffel")).toBeInTheDocument();
    expect(screen.getByText("Oui")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Ajouter un logement"));
    expect(onCreate).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Modifier"));
    expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({
      ACCN_ID: 1,
      ACCC_NAME: "Appartement Paris",
    }));

    fireEvent.click(screen.getByText("Supprimer"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
