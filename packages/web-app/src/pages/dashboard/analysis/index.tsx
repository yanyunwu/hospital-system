import type { FC } from 'react'
import { Suspense } from 'react'
import { Col,Row } from 'antd'
import { GridContent } from '@ant-design/pro-components'
import PageLoading from './components/PageLoading'
import SexPie from './components/ant-design-charts/SexPie'
import SimpleDataCard from '@/components/SimpleDataCard'
import PeopleLine from './components/ant-design-charts/PeopleLine'
import SessionColumn from './components/ant-design-charts/SessionColumn'
import CommunityLine from './components/ant-design-charts/CommunityLine'
import PeoplePostBar from './components/ant-design-charts/PeoplePostBar'
import PostCommentBar from './components/ant-design-charts/PostCommentBar'

type AnalysisProps = {
  loading: boolean;
};

const Analysis: FC<AnalysisProps> = () => {
  return (
    <GridContent>

      <Suspense fallback={<PageLoading />}>
        <Row gutter={[24, 24]}>
          <Col xl={6} lg={6} md={12} sm={24} xs={24}>
            <SimpleDataCard title='用户总量' count={10} />
          </Col>
          <Col xl={6} lg={6} md={12} sm={24} xs={24}>
            <SimpleDataCard title='社区发帖总量/回复总量' count={20} />
          </Col>
          <Col xl={6} lg={6} md={12} sm={24} xs={24}>
            <SimpleDataCard title='会话/消息总量' count={20} />
          </Col>
          <Col xl={6} lg={6} md={12} sm={24} xs={24}>
            <SimpleDataCard title='用户浏览时长总量' count={20} />
          </Col>
        </Row>
      </Suspense>

      <Row gutter={[24, 24]} >
        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24}}>
          <Suspense fallback={null}>
            <SexPie />
          </Suspense>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24}}>
          <Suspense fallback={null}>
            <PeopleLine />
          </Suspense>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24}}>
          <Suspense fallback={null}>
            <SessionColumn />
          </Suspense>
        </Col>
      </Row>

      <Row gutter={[24, 24]} >
        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24}}>
          <Suspense fallback={null}>
            <CommunityLine />
          </Suspense>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24}}>
          <Suspense fallback={null}>
            <PeoplePostBar />
          </Suspense>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{marginTop: 24}}>
          <Suspense fallback={null}>
            <PostCommentBar />
          </Suspense>
        </Col>
      </Row>
    </GridContent>
  )
}

export default Analysis
