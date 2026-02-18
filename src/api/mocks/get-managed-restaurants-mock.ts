import { http, HttpResponse } from 'msw'
import { GetManagedResponse } from '../get-managed-restaurant'


export const getManagedProfileMock = http.get<never, never, GetManagedResponse>('/managed-restaurant', () => {

    return HttpResponse.json({
        id: '666',
        name: 'diabao',
        createdAt: new Date(),
        updatedAt: null,
        description: "OMG",
        managerId: "2"
    })

})
