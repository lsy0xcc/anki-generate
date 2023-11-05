function TableDisplay({ data }: { data: unknown }) {
  const entries = Object.entries(data ?? {});
  return (
    <table>
      <thead>
        <tr>
          <th>key</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr>
            <td>{entry[0]}</td>
            <td>{JSON.stringify(entry[1])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableDisplay;
