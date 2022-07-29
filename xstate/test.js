import { createMachine, assign } from 'xstate';

const redditMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCdIQJYBcB0n0GMBrMTAfX1QENNIBiAZQFUBhZgUXvsVAAcB7WFnR8AdtxAAPRAFoALAA5sAdgBsAVgCcGgEwLt8pUu0qVAGhABPGQEZta7BoAMapfPkbZs-a7UBfX+aoEBg4eEQk5FQ0ELQAYgCCAJIAMuL8gnii4lII0sYa2I4AzNpKnkoa1ppKzuZWuUWFdrJqzSrFjrJF6v6BaFi4BMRkFGDUdAByAPIAKqRTjDNpAkJZSJKIsgVKairWRQeOKtpFjtaydTIljUrW8ioarvLaulu9IEEh2Kj4YOgAbmBSGFhrRErFSIkJqR6GwAEoANUS7GWGWEYnWOVs1mwr3k3SKag6DyKlwQ12wmgeKnknhcXRUsnenwGPz+gOBQxIYIhCzmsMRyLYqNWGNAOWMSlx2ic9zUXhchjJTmw8nljyKty81L8AQ+-RwYGQyD4yFoUwR8JFmTFG1yd0Ux201mcSk17naajJLxU2H2W3ajlKKjdJ2ZBuwIjAAHcAASwTDjWPWWhsQEiTCx7TW9HZRB3Rx+zSORyVDStayuUmWGxVP1GF0vIpaTWE-x6kR8CBwcQs0JckZRSA5tbimTOgq0tQGLT6eRneVk6SanHWGluoq0iohgzh4KssC-AFAkEkEe2nKyVctSrNpzqIpVMw1hBGXGdadEgwtQnyPdfI0TWQc881ybQjgcZ0tnOIlbHcC4X2sF1INcctbGKctVH-AY+EBZBOXCTAQMxGwpQ8NUdhdDR3FsEwyVuKVWhMQxSmnBRrGwnAE0oZAyB4E1flgeB1nSUVQJdX0VE3apaV0IlFxfTQCkcVxPH0ZtnhlTjcDgTN0FgWM+AAV0zWAjX+AgwGIscEG1QpOgLTwNPKJcCjUIkFA8M4aQeSttKjONuJoZNrLtE5ZFVRkV0cNwPG6JdH3seU7DdWwdFuTjQpyPINEaYpSnKSpqlqF85E8P1jlkVw110c4OPbIA */
  createMachine(
    {
      context: { redCount: 0, greenCount: 0, yellowCount: 0 },
      id: 'reddit',
      initial: 'ticket_created',
      states: {
        ticket_created: {
          exit: assign({ redCount: (ctx) => ctx.redCount + 1 }),
          on: {
            SUCCESS: {
              actions: assign({ greenCount: (ctx) => ctx.greenCount + 1 }),
              target: 'receive_ticket'
            },
            FAIL: {
              target: 'error'
            },
            NOT_OUT: {
              target: 'new state 1'
            }
          }
        },
        receive_ticket: {
          entry: assign({ yellowCount: (ctx) => ctx.yellowCount + 1 }),
          on: {
            IF_IN_SERVICE: {
              actions: ['countAction', 'doSomething'],
              target: 'start_process'
            },
            IF_OUT_SERVICE: {
              target: 'test is out service'
            }
          }
        },
        error: {
          on: {
            OVER: {
              target: 'over_ticket'
            }
          }
        },
        over_ticket: {},
        start_process: {},
        'test is out service': {},
        'new state 1': {
          on: {
            'Event 2': {
              target: 'receive_ticket'
            }
          }
        }
      }
    },
    {
      actions: {
        countAction: assign({
          count: (ctx) => ctx.greenCount + ctx.redCount + ctx.yellowCount
        }),
        doSomething: () => console.log('为所欲为')
      }
    }
  );
