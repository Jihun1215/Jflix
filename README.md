# The MovieDB API를 사용한 넷플릭스 클론 코딩

# 프로젝트명 - Jflix

## 배포 사이트

[Jflix]("")

## 프로젝트 기능

영화 및 Tv의 대한 평점 및 개봉일을 볼 수 있는 웹 사이트 입니다.

## 🌟 1.

## 🔍 2. 검색 기능

## ❤️ 3. 찜하기 기능

- 마음에 드는 콘텐츠를 찜을 통해 보관할 수 있습니다.
- Alert Modal를 통해 찜 성공을 확인 할 수 있습니다.

#

## 👥 4. 다양한 콘텐츠 보기

- 화면 Width에 따라 콘텐츠를 갯수를 조절하고 슬라이더 형식으로 다른 콘텐츠를 볼 수 있습니다.
- 특정 콘텐츠의 마우스를 올릴시 간단한 정보를 볼 수 있습니다.

#

## FE 스텍

### 1. Vite

Vite는 빠른 개발 환경과 함께 HMR (Hot Module Replacement)를 통한 실시간 모듈 교체를 제공하고,빌드 시간에 미리 코드를 선언적으로 분할하여 최적화된 번들을 생성하므로 초기 로딩 속도가 향상되는 장점이 있습니다. 반면, Webpack은 번들을 생성하는 데 더 많은 시간이 소요되고, HMR 성능이 상대적으로 떨어질 수 있기 때문에 vite를 선택하였습니다.

#

### 2. Typescript

정적 타입 시스템을 도입하여 개발자가 코드를 작성할 때 발생할 수 있는 오류를 사전에 방지함으로써 안정성을 높이고 유지보수를 용이하게 때문에 사용했습니다.

#

### 3. Recoil

Redux의 비해 비교적 낮은 러닝커브와 보일러 플레이트가 적고, 직관적이며 간단한 구조를 가지고 있고, 소규모의 프로젝트이기 때문에 사용했습니다.

#

### 4. React-Query

병렬적인 데이터 패칭과 무한스크롤 기능 등 캐싱처리를 위해서 선택했습니다.

#

### 5. Framer-motion

간편하게 애니메이션을 구현할 수 있고, 수많은 자료들이 있고, 성능 최적화가 자체적으로 내장되어 있기 때문에,

#

## 적용된 기능

### framer-motion

### []()☑ useQueries

> 병렬적인 id값을 통해 상세 정보를 불러왔다.

#

### []()☑ useInfiniteQuery

> 무한스크롤 기능을 구현하기 위해서 사용했습니다.

#

## Vite

### vite 환경에서 svg 사용하기

플러그인 설치
yarn add -D vite-plugin-svgr

vite.config.ts 파일 수정
import svgr from 'vite-plugin-svgr'; // 내용 추가

vite.env.d.ts
/// <reference types="vite-plugin-svgr/client" />

## React-Query

#### []()☑ useQueries

> 병렬적인 id값을 통해 상세 정보를 불러왔다.

#

#### []()☑ useInfiniteQuery

> 무한스크롤 기능을 구현하기 위해서 사용했습니다.

#

## 트러블 슈팅

### 검색결과 데이터가 캐싱되어서 다음 검색결과가 늦게 나오는 현상


- 기존 코드 

<code>  const { data, isSuccess, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    'searchMovie',
    ({ pageParam = 1 }) => getSerachMovieContent({ pageParam, query }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
      },
      // 쿼리가 만료되면 다시 불러오도록 설정
      staleTime: 0, // 예: 10초
      // enabled를 사용하여 쿼리값이 변경될 때마다 데이터를 다시 불러오도록 설정
      enabled: !!query,
    }
  );
</code>

- 수정된 코드 

<code>  const { data, isSuccess, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
  ['searchMovie', { pageParam: 1, query }], // <-- query 매개변수를 queryKey에 추가
  ({ pageParam = 1 }) => getSerachMovieContent({ pageParam, query }),
  {
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
    },
    staleTime: 0,
    enabled: !!query,
  }
);
</code>

query 매개변수를 queryKey 배열에 포함시킴으로써 query 매개변수의 변경을 데이터를 다시 불러오는 트리거를 
처리했다. 

요약하면 querykey를 사용하여 ReactQuery의 쿼리의 변화를 감지하고 해당하는 데이터를 새로 불러왔다. 

### []()☑ queryKey

>

#

<!-- ### []()☑ useInfiniteQuery   -->
 <!-- > 무한스크롤 기능을 구현하기 위해서 사용했습니다.  -->
<!-- # -->
