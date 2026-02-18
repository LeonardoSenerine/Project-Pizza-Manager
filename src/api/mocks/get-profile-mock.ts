import { http, HttpResponse } from 'msw'
import { GetProfileResponse } from '../get-profile'


export const getProfileMock = http.get<never, never, GetProfileResponse>('/me', () => {

    return HttpResponse.json({
        id: '666',
        name: 'diabao',
        email: 'diabao@sexooral',
        phone: null,
        role: 'manager',
        createdAt: new Date(),
        updatedAt: null
    })

})
