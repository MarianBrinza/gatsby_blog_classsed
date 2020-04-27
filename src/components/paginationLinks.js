import React from 'react';
import { Pagination } from 'reactstrap';
import PaginationItem from 'reactstrap/es/PaginationItem';
import PaginationLink from 'reactstrap/es/PaginationLink';


const PaginationLinks = ({ currentPage, numberOfPages }) => {
  const isFirst = (currentPage === 1);
  const isLast = (currentPage === numberOfPages);

  const previousPage = (currentPage - 1 === 1) ? '/' : '/page/' + (currentPage - 1).toString();
  const nextPage = '/page/' + (currentPage + 1).toString();
  debugger;
  return (
    <Pagination aria-label='page navigation'>
      {/* left arrow */}
      {/*  if we are on first page we  need to disable previousPage btn */}
      {
        isFirst ? (
          <PaginationItem disabled>
            <PaginationLink previous href='/'/>
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationLink previous href={previousPage}/>
          </PaginationItem>
        )
      }

      {/* the numbers between arrows */}
      {
        Array.from({ length: numberOfPages }, (_, index) => {
          if (currentPage === index + 1) {
            return (
              <PaginationItem active key={`page-number${index + 1}`}>
                <PaginationLink href={`/${(index === 0) ? ('') : ('page/' + (index + 1).toString())}`}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={`page-number${index + 1}`}>
                <PaginationLink href={`/${(index === 0) ? ('') : ('page/' + (index + 1).toString())}`}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }

        })
      }

      {/* right arrow */}
      {/* check if we are on last page*/}
      {
        isLast ? (
          <PaginationItem disabled>
            <PaginationLink next href={nextPage}/>
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationLink next href={nextPage}/>
          </PaginationItem>
        )
      }
    </Pagination>
  );
};

export default PaginationLinks;
