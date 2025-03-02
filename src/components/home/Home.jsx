import React from 'react'
import NavbarHome from './Navbar-home';
import TemplateGallery from './template-gallery';
import { usePaginatedQuery, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import DocumentsTable from './DocumentsTable';
import { useSearchParam } from '@/hooks/use-search';
const Home = () => {
  const [search] = useSearchParam("search")
  const {results,status,loadMore} = usePaginatedQuery(api.documents.get,{search},{initialNumItems:5})
  return (
    <div className='min-h-screen flex flex-col'>
    <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-7'> 
  <NavbarHome/>
    </div>
    <div className='mt-16 text-2xl'>
          <TemplateGallery/>
        <DocumentsTable documents={results} status={status} loadMore={loadMore}/>
    </div>
  </div>
  )
}

export default Home