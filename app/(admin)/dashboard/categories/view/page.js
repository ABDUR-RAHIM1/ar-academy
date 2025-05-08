
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import React from 'react';
import CategorieTable from './CategorieTable';
import { getAllCategorie } from '@/app/apiActions/admin/adminApi';

export default async function ViewCategories() {
  const { status, data } = await getAllCategorie();

  if (!status || !data) {
    return <Error />;
  }

  return (
    <div className="w-full p-4">
      {status === 200 && data && data.length <= 0 ? (
        <NoData />
      ) : (
        <div>
          <CategorieTable categories={data} />
        </div>
      )}
    </div>
  );
}


