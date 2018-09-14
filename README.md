# Vouch Developer Test

![Version 1.0.0](https://img.shields.io/badge/version-1.0.0-yellowgreen.svg)
![Content-API](https://img.shields.io/badge/content-API-green.svg)
![Section-Backend](https://img.shields.io/badge/section-backend-lightgrey.svg)

Vouch Developer Test: Backend section from Ticket Xpo
Using [MongoDB](https://mongodb.com) ODM with [mongoosejs](https://mongoosejs.com)

## API Endpoint

_Note: For now, i dont implement validation token. So use wisely_

| URL / Endpoint                                     | Description                        |
| -------------------------------------------------- | ---------------------------------- |
| /tickets                                           | Show list ticket, sorted by newest |
| /tickets/add                                       | Add new ticket                     |
| /tickets/update                                    | Update ticket                      |
| /tickets/filter?status={open,closed,active,failed} | Filter tickets by status           |
| /tickets/delete                                    | Delete tickets                     |
