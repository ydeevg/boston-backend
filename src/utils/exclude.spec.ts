import { exclude } from "./exclude"

describe('exclude', () => {

  const Roles = {
    Admin: 'admin',
    Manager: 'manager'
  }

  describe('from', () => {
    let actual: string[]

    beforeEach(() => {
      actual = exclude(Roles.Admin).from(Roles)
    })

    it('should be not contain admin', () => {
      expect(actual).not.toContain(Roles.Admin)
    })

    it('should be contain manager', () => {
      expect(actual).toContain(Roles.Manager)
    })
  })
})
