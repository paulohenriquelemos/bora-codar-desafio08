import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

import { GradientSVGVendas } from '../../components/GradientSVGVendas'
import { GradientSVGMensal } from '../../components/GradientSVGMensal'
import { BarWeekDay } from '../../components/BarWeekDay'

import 'react-circular-progressbar/dist/styles.css'

import smileImg from '../../assets/smile.svg'
import { Loading } from '../../components/Loading'

interface VendasSemana {
  day: string
  vendaDia: number
  height: number
}

interface Data {
  nps: {
    score: string
  }
  vendas: {
    percentage: number
  }
  meta: {
    alcancado: number
    esperado: number
  }
  vendasSemana: VendasSemana[]
}

export function Home() {
  const [data, setData] = useState<Data>()
  const [minVendas, setMinVendas] = useState<VendasSemana>()
  const [maxVendas, setMaxVendas] = useState<VendasSemana>()

  useEffect(() => {
    axios.get('data.json').then((response) => {
      setData(response.data)

      const maxNumberVendas = Math.max(
        ...response.data.vendasSemana.map(
          (o: { vendaDia: number }) => o.vendaDia,
        ),
      )

      const dayWithMaxVendas = response.data.vendasSemana.find(
        (e: { vendaDia: number }) => e.vendaDia === maxNumberVendas,
      )
      setMaxVendas(dayWithMaxVendas)

      const minNumberVendas = Math.min(
        ...response.data.vendasSemana.map(
          (o: { vendaDia: number }) => o.vendaDia,
        ),
      )

      const dayWithMinVendas = response.data.vendasSemana.find(
        (e: { vendaDia: number }) => e.vendaDia === minNumberVendas,
      )
      setMinVendas(dayWithMinVendas)
    })
  }, [])

  if (!data || !maxVendas || !minVendas) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl flex flex-col gap-14">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="bg-gray700 lg:w-64 flex flex-col items-center justify-between p-7 rounded-2xl shadow-md shadow-gray-900">
          <h3 className="text-white font-semibold text-2xl">NPS geral</h3>
          <div className="flex flex-col items-center justify-center py-8">
            <img src={smileImg} alt="" />
            <span className="block mt-4 text-green300 text-2xl font-semibold">
              Excelente!
            </span>
          </div>
          <span className="text-sm text-white font-medium">
            NPS Score <strong>{data.nps.score}</strong>
          </span>
        </div>
        {/* Card 02 - Vendas fechadas */}
        <div className="bg-gray700 flex-1 flex flex-col items-center justify-between p-7 rounded-2xl shadow-md shadow-gray-900">
          <h3 className="text-white font-semibold text-2xl">Vendas fechadas</h3>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-48 h-48">
              <GradientSVGVendas />
              <CircularProgressbarWithChildren
                value={data.vendas.percentage}
                strokeWidth={12}
                styles={{
                  path: {
                    stroke: 'url(#gradient-vendas)',
                    transition: 'stroke-dashoffset 1.4s',
                  },
                  trail: {
                    stroke: '#d9d9d919',
                  },
                }}
              >
                <span className="text-white text-4xl">
                  {data.vendas.percentage}%
                </span>
                <span className="text-white text-base">alcançada</span>
              </CircularProgressbarWithChildren>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 block rounded-full bg-gray600"></span>
              <span className="text-sm text-white font-medium">
                Esperado <strong>100</strong>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 block rounded-full bg-gradient-to-r from-purple300 to-purple700"></span>
              <span className="text-sm text-white font-medium">
                Alcaçado <strong>{data.vendas.percentage}</strong>
              </span>
            </div>
          </div>
        </div>
        {/* Card 03 - Meta mensal */}
        <div className="bg-gray700 flex-1 flex flex-col items-center justify-between p-7 rounded-2xl shadow-md shadow-gray-900">
          <h3 className="text-white font-semibold text-2xl">Meta mensal</h3>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-48 h-48">
              <GradientSVGMensal />
              <CircularProgressbarWithChildren
                value={(data.meta.alcancado * 100) / data.meta.esperado}
                strokeWidth={12}
                styles={{
                  path: {
                    stroke: 'url(#gradient-mensal)',
                    transition: 'stroke-dashoffset 1.4s',
                  },
                  trail: {
                    stroke: '#d9d9d919',
                  },
                }}
              >
                <span className="text-white text-4xl">
                  {(data.meta.alcancado * 100) / data.meta.esperado}%
                </span>
                <span className="text-white text-base">alcançada</span>
              </CircularProgressbarWithChildren>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 block rounded-full bg-gray600"></span>
              <span className="text-sm text-white font-medium">
                Esperado <strong>R$ {data.meta.esperado}K</strong>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 block rounded-full bg-gradient-to-r from-orange300 to-purple500"></span>
              <span className="text-sm text-white font-medium">
                Alcaçado <strong>R$ {data.meta.alcancado}K</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray700 w-full flex flex-col lg:flex-row lg:items-center justify-between p-7 rounded-2xl shadow-md shadow-gray-900">
        <div className="flex flex-col">
          <h3 className="text-white text-2xl font-semibold">
            Vendas por dia da semana
          </h3>
          <div className="flex gap-1 items-center mt-8">
            <span className="triangle-up"></span>
            <span className="text-white text-sm font-medium">
              Dia com mais vendas
            </span>
          </div>
          <span className="block mt-2 text-white text-2xl font-medium">
            {maxVendas.day}
          </span>
          <div className="flex gap-1 items-center mt-8">
            <span className="triangle-down"></span>
            <span className="text-white text-sm font-medium">
              Dia com menos vendas
            </span>
          </div>
          <span className="block mt-2 text-white text-2xl font-medium">
            {minVendas.day}
          </span>
        </div>
        <div className="right mt-8 lg:mt-0 relative flex">
          <div className="bars relative flex w-full justify-between lg:gap-14 text-white before:content-[''] before:block before:w-full before:h-[3px] before:bg-gray600 before:rounded-full before:absolute before:top-1/2 before:-translate-y-1/2 before:z-0">
            {data.vendasSemana.map((week) => {
              return (
                <BarWeekDay
                  key={week.day}
                  vendaDia={week.vendaDia}
                  day={week.day}
                  maxVenda={maxVendas.vendaDia}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
