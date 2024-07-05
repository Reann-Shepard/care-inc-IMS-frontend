const OrderManufacturerAddOrder = () => {
  return (
    <div>
      <div className="flex gap-3 m-2">
        <button className="btn btn-outline btn-info">Add Row</button>
        <button className="btn btn-outline btn-error">Remove Row</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Manufacturer</th>
            <th>Type</th>
            <th>Color</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export { OrderManufacturerAddOrder };
