import { OrderStatus } from "./order-status"
import { render } from '@testing-library/react'
//diferença entre get, query e find 
//get ele procura o elemento que esta em tela na hora, se nao achar ele retorna erro
//find aguarda uma promise, ent ele espera o elemento aparecer
//query procura o elemneto igual o get mas caso ele nao aja, nao será errado, e retornará nulo
describe('Order Status', () => {
    it('should display the right text when order status is pending', () => {

        const wrapper = render(<OrderStatus status="pending" />)
        const badgeElement = wrapper.getByTestId('badge')
        const statustext = wrapper.getByText('Pendente')

        expect(statustext).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-slate-600')

    })

    it('should display the right text when order status is canceled', () => {

        const wrapper = render(<OrderStatus status="canceled" />)
        const badgeElement = wrapper.getByTestId('badge')
        const statustext = wrapper.getByText('Cancelado')

        expect(statustext).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-rose-600')

    })

    it('should display the right text when order status is delivering', () => {

        const wrapper = render(<OrderStatus status="delivering" />)
        const badgeElement = wrapper.getByTestId('badge')
        const statustext = wrapper.getByText('Em entrega')

        expect(statustext).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-amber-600')

    })

    it('should display the right text when order status processing', () => {

        const wrapper = render(<OrderStatus status="processing" />)
        const badgeElement = wrapper.getByTestId('badge')
        const statustext = wrapper.getByText('Em preparo')

        expect(statustext).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-amber-600')

    })

    it('should display the right text when order status is delivered', () => {

        const wrapper = render(<OrderStatus status="delivered" />)
        const badgeElement = wrapper.getByTestId('badge')
        const statustext = wrapper.getByText('Entregue')

        expect(statustext).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-emerald-600')

    })

})