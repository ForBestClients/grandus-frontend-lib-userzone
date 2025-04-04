const TableSkeleton = ({withTitle = true}) => {
  return (
    <div className="animate-pulse">
      {withTitle ? (<h2 className="bg-grey w-1/3"></h2>) : ''}
      <div className="table-responsive">
        <table className="table-auto w-full">
          <thead>
            <tr className="w-100">
              <th className="text-left">
                <span className="inline-block bg-grey w-2/3 h-[20px]"></span>
              </th>
              <th className="text-left">
                <span className="inline-block bg-grey w-2/3 h-[20px]"></span>
              </th>
              <th className="text-left">
                <span className="inline-block bg-grey w-2/3 h-[20px]"></span>
              </th>
              <th className="text-left">
                <span className="inline-block bg-grey w-2/3 h-[20px]"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>
                  <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
                </b>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td className={'text-end'}>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
            </tr>
            <tr>
              <td>
                <b>
                  <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
                </b>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td className={'text-end'}>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
            </tr>
            <tr>
              <td>
                <b>
                  <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
                </b>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td className={'text-end'}>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
            </tr>
            <tr>
              <td>
                <b>
                  <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
                </b>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
              <td className={'text-end'}>
                <a className="inline-block bg-grey w-2/3 h-[15px]" href="#"></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TableSkeleton;
