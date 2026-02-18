import { Pagination } from "./pagination";
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
    beforeEach(() => {
        onPageChangeCallback.mockClear()
    })
    it('should be able to navigate to the next page', async () => {
        const pipiu = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        )

        //simplesmente ele procura por qualquer botao q esteja em tela, q esteja exibindo o "proxima pagina"
        const nextPageButton = pipiu.getByRole('button', {
            name: 'Próxima página',
        })

        const user = userEvent.setup()

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalled()


    })
    it('should display the right amount of pages and results', () => {
        const pipiu = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        )

        expect(pipiu.getByText('Página 1 de 20')).toBeInTheDocument()
        expect(pipiu.getByText('Total de 200 iten(s)')).toBeInTheDocument()

    })
    it('should be able to navigate to the previus page', async () => {

        const pipiu = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        )

        //simplesmente ele procura por qualquer botao q esteja em tela, q esteja exibindo o "proxima pagina"
        const nextPageButton = pipiu.getByRole('button', {
            name: 'Pagina anterior',
        })

        const user = userEvent.setup()

        await user.click(nextPageButton)
        console.log(onPageChangeCallback.mock.calls)

        expect(onPageChangeCallback).toHaveBeenCalledWith(4)


    })
    it('should be able to navigate to the first page', async () => {
        const pipiu = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        )

        //simplesmente ele procura por qualquer botao q esteja em tela, q esteja exibindo o "proxima pagina"
        const nextPageButton = pipiu.getByRole('button', {
            name: 'Primeira página',
        })

        const user = userEvent.setup()

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(0)

    })
    it('should be able to navigate to the last page', async () => {
        const pipiu = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        )

        //simplesmente ele procura por qualquer botao q esteja em tela, q esteja exibindo o "proxima pagina"
        const nextPageButton = pipiu.getByRole('button', {
            name: 'Ultima pagina',
        })

        const user = userEvent.setup()

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(19)

    })
})