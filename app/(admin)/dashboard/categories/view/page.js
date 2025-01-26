import { getsActions } from '@/actions/admins/getsAction';
import { categoriePostGet } from '@/constans';
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import React from 'react';
import CategorieTable from './CategorieTable';

export default async function ViewCategories() {
  const { status, data } = await getsActions(categoriePostGet);

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


