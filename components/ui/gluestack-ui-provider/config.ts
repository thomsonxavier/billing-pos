'use client';
import { vars } from 'nativewind';

export const config = {
  light: vars({
    '--color-primary-0': '255 255 255',
    '--color-primary-50': '239 246 255',
    '--color-primary-100': '219 234 254',
    '--color-primary-200': '191 219 254',
    '--color-primary-300': '147 197 253',
    '--color-primary-400': '96 165 250',
    '--color-primary-500': '25 118 210', // Your primary blue #1976D2
    '--color-primary-600': '21 94 117',
    '--color-primary-700': '13 71 161', // Your secondary #0D47A1
    '--color-primary-800': '13 71 161',
    '--color-primary-900': '13 71 161',
    '--color-primary-950': '13 71 161',

    /* Secondary  */
    '--color-secondary-0': '253 253 253',
    '--color-secondary-50': '251 251 251',
    '--color-secondary-100': '246 246 246',
    '--color-secondary-200': '242 242 242',
    '--color-secondary-300': '237 237 237',
    '--color-secondary-400': '230 230 231',
    '--color-secondary-500': '217 217 219',
    '--color-secondary-600': '198 199 199',
    '--color-secondary-700': '189 189 189',
    '--color-secondary-800': '177 177 177',
    '--color-secondary-900': '165 164 164',
    '--color-secondary-950': '157 157 157',

    /* Tertiary - Your accent orange */
    '--color-tertiary-0': '255 255 255',
    '--color-tertiary-50': '255 247 237',
    '--color-tertiary-100': '255 237 213',
    '--color-tertiary-200': '254 215 170',
    '--color-tertiary-300': '253 186 116',
    '--color-tertiary-400': '251 146 60',
    '--color-tertiary-500': '255 167 38', // Your accent #FFA726
    '--color-tertiary-600': '234 88 12',
    '--color-tertiary-700': '194 65 12',
    '--color-tertiary-800': '154 52 18',
    '--color-tertiary-900': '124 45 18',
    '--color-tertiary-950': '67 20 7',

    /* Error */
    '--color-error-0': '254 233 233',
    '--color-error-50': '254 226 226',
    '--color-error-100': '254 202 202',
    '--color-error-200': '252 165 165',
    '--color-error-300': '248 113 113',
    '--color-error-400': '239 68 68',
    '--color-error-500': '220 38 38', // Your destructive #dc2626
    '--color-error-600': '220 38 38',
    '--color-error-700': '185 28 28',
    '--color-error-800': '153 27 27',
    '--color-error-900': '127 29 29',
    '--color-error-950': '83 19 19',

    /* Success */
    '--color-success-0': '228 255 244',
    '--color-success-50': '202 255 232',
    '--color-success-100': '162 241 192',
    '--color-success-200': '132 211 162',
    '--color-success-300': '102 181 132',
    '--color-success-400': '72 151 102',
    '--color-success-500': '52 131 82',
    '--color-success-600': '42 121 72',
    '--color-success-700': '32 111 62',
    '--color-success-800': '22 101 52',
    '--color-success-900': '20 83 45',
    '--color-success-950': '27 50 36',

    /* Warning */
    '--color-warning-0': '255 249 245',
    '--color-warning-50': '255 244 236',
    '--color-warning-100': '255 231 213',
    '--color-warning-200': '254 205 170',
    '--color-warning-300': '253 173 116',
    '--color-warning-400': '251 149 75',
    '--color-warning-500': '231 120 40',
    '--color-warning-600': '215 108 31',
    '--color-warning-700': '180 90 26',
    '--color-warning-800': '130 68 23',
    '--color-warning-900': '108 56 19',
    '--color-warning-950': '84 45 18',

    /* Info */
    '--color-info-0': '236 248 254',
    '--color-info-50': '199 235 252',
    '--color-info-100': '162 221 250',
    '--color-info-200': '124 207 248',
    '--color-info-300': '87 194 246',
    '--color-info-400': '50 180 244',
    '--color-info-500': '13 166 242',
    '--color-info-600': '11 141 205',
    '--color-info-700': '9 115 168',
    '--color-info-800': '7 90 131',
    '--color-info-900': '5 64 93',
    '--color-info-950': '3 38 56',

    /* Typography */
    '--color-typography-0': '254 254 255',
    '--color-typography-50': '245 245 245',
    '--color-typography-100': '229 229 229',
    '--color-typography-200': '219 219 220',
    '--color-typography-300': '212 212 212',
    '--color-typography-400': '163 163 163',
    '--color-typography-500': '140 140 140',
    '--color-typography-600': '115 115 115',
    '--color-typography-700': '82 82 82',
    '--color-typography-800': '64 64 64',
    '--color-typography-900': '38 38 39',
    '--color-typography-950': '23 23 23',

    /* Outline */
    '--color-outline-0': '253 254 254',
    '--color-outline-50': '243 243 243',
    '--color-outline-100': '230 230 230',
    '--color-outline-200': '221 220 219',
    '--color-outline-300': '211 211 211',
    '--color-outline-400': '165 163 163',
    '--color-outline-500': '140 141 141',
    '--color-outline-600': '115 116 116',
    '--color-outline-700': '83 82 82',
    '--color-outline-800': '65 65 65',
    '--color-outline-900': '39 38 36',
    '--color-outline-950': '26 23 23',

    /* Background */
    '--color-background-0': '255 255 255',
    '--color-background-50': '246 246 246',
    '--color-background-100': '242 241 241',
    '--color-background-200': '220 219 219',
    '--color-background-300': '213 212 212',
    '--color-background-400': '162 163 163',
    '--color-background-500': '142 142 142',
    '--color-background-600': '116 116 116',
    '--color-background-700': '83 82 82',
    '--color-background-800': '65 64 64',
    '--color-background-900': '39 38 37',
    '--color-background-950': '18 18 18',

    /* Background Special */
    '--color-background-error': '254 241 241',
    '--color-background-warning': '255 243 234',
    '--color-background-success': '237 252 242',
    '--color-background-muted': '247 248 247',
    '--color-background-info': '235 248 254',

    /* Focus Ring Indicator  */
    '--color-indicator-primary': '55 55 55',
    '--color-indicator-info': '83 153 236',
    '--color-indicator-error': '185 28 28',
  }),
  dark: vars({
    '--color-primary-0': '15 23 42', // Your dark background #0f172a
    '--color-primary-50': '30 41 59', // Your dark card #1e293b
    '--color-primary-100': '51 65 85', // Your dark muted #334155
    '--color-primary-200': '71 85 105',
    '--color-primary-300': '100 116 139', // Your dark muted-foreground #94a3b8
    '--color-primary-400': '148 163 184',
    '--color-primary-500': '66 165 245', // Your dark primary #42A5F5
    '--color-primary-600': '96 165 250',
    '--color-primary-700': '30 64 175', // Your dark secondary #1e40af
    '--color-primary-800': '30 64 175',
    '--color-primary-900': '30 64 175',
    '--color-primary-950': '30 64 175',

    /* Secondary - Your dark secondary */
    '--color-secondary-0': '15 23 42', // Your dark background #0f172a
    '--color-secondary-50': '30 41 59', // Your dark card #1e293b
    '--color-secondary-100': '51 65 85', // Your dark muted #334155
    '--color-secondary-200': '71 85 105',
    '--color-secondary-300': '100 116 139', // Your dark muted-foreground #94a3b8
    '--color-secondary-400': '148 163 184',
    '--color-secondary-500': '30 64 175', // Your dark secondary #1e40af
    '--color-secondary-600': '30 64 175',
    '--color-secondary-700': '30 64 175',
    '--color-secondary-800': '30 64 175',
    '--color-secondary-900': '30 64 175',
    '--color-secondary-950': '30 64 175',

    /* Tertiary - Your dark accent */
    '--color-tertiary-0': '15 23 42',
    '--color-tertiary-50': '30 41 59',
    '--color-tertiary-100': '51 65 85',
    '--color-tertiary-200': '71 85 105',
    '--color-tertiary-300': '100 116 139',
    '--color-tertiary-400': '148 163 184',
    '--color-tertiary-500': '251 149 75', // Your dark accent #fb923c
    '--color-tertiary-600': '253 186 116',
    '--color-tertiary-700': '254 209 170',
    '--color-tertiary-800': '255 233 213',
    '--color-tertiary-900': '255 242 229',
    '--color-tertiary-950': '255 250 245',

    /* Error */
    '--color-error-0': '83 19 19',
    '--color-error-50': '127 29 29',
    '--color-error-100': '153 27 27',
    '--color-error-200': '185 28 28',
    '--color-error-300': '220 38 38',
    '--color-error-400': '230 53 53',
    '--color-error-500': '239 68 68', // Your dark destructive #ef4444
    '--color-error-600': '249 97 96',
    '--color-error-700': '229 91 90',
    '--color-error-800': '254 202 202',
    '--color-error-900': '254 226 226',
    '--color-error-950': '254 233 233',

    /* Success */
    '--color-success-0': '27 50 36',
    '--color-success-50': '20 83 45',
    '--color-success-100': '22 101 52',
    '--color-success-200': '32 111 62',
    '--color-success-300': '42 121 72',
    '--color-success-400': '52 131 82',
    '--color-success-500': '72 151 102',
    '--color-success-600': '102 181 132',
    '--color-success-700': '132 211 162',
    '--color-success-800': '162 241 192',
    '--color-success-900': '202 255 232',
    '--color-success-950': '228 255 244',

    /* Warning */
    '--color-warning-0': '84 45 18',
    '--color-warning-50': '108 56 19',
    '--color-warning-100': '130 68 23',
    '--color-warning-200': '180 90 26',
    '--color-warning-300': '215 108 31',
    '--color-warning-400': '231 120 40',
    '--color-warning-500': '251 149 75',
    '--color-warning-600': '253 173 116',
    '--color-warning-700': '254 205 170',
    '--color-warning-800': '255 231 213',
    '--color-warning-900': '255 244 237',
    '--color-warning-950': '255 249 245',

    /* Info */
    '--color-info-0': '3 38 56',
    '--color-info-50': '5 64 93',
    '--color-info-100': '7 90 131',
    '--color-info-200': '9 115 168',
    '--color-info-300': '11 141 205',
    '--color-info-400': '13 166 242',
    '--color-info-500': '50 180 244',
    '--color-info-600': '87 194 246',
    '--color-info-700': '124 207 248',
    '--color-info-800': '162 221 250',
    '--color-info-900': '199 235 252',
    '--color-info-950': '236 248 254',

    /* Typography - Your dark foreground */
    '--color-typography-0': '15 23 42', // Your dark background #0f172a
    '--color-typography-50': '30 41 59', // Your dark card #1e293b
    '--color-typography-100': '51 65 85', // Your dark muted #334155
    '--color-typography-200': '71 85 105',
    '--color-typography-300': '100 116 139', // Your dark muted-foreground #94a3b8
    '--color-typography-400': '148 163 184',
    '--color-typography-500': '241 245 249', // Your dark foreground #f1f5f9
    '--color-typography-600': '241 245 249',
    '--color-typography-700': '241 245 249',
    '--color-typography-800': '241 245 249',
    '--color-typography-900': '241 245 249',
    '--color-typography-950': '241 245 249',

    /* Outline - Your dark border */
    '--color-outline-0': '15 23 42', // Your dark background #0f172a
    '--color-outline-50': '30 41 59', // Your dark card #1e293b
    '--color-outline-100': '51 65 85', // Your dark muted #334155
    '--color-outline-200': '51 65 85', // Your dark border #334155
    '--color-outline-300': '51 65 85',
    '--color-outline-400': '51 65 85',
    '--color-outline-500': '51 65 85',
    '--color-outline-600': '51 65 85',
    '--color-outline-700': '51 65 85',
    '--color-outline-800': '51 65 85',
    '--color-outline-900': '51 65 85',
    '--color-outline-950': '51 65 85',

    /* Background - Your dark theme */
    '--color-background-0': '15 23 42', // Your dark background #0f172a
    '--color-background-50': '30 41 59', // Your dark card #1e293b
    '--color-background-100': '51 65 85', // Your dark muted #334155
    '--color-background-200': '51 65 85',
    '--color-background-300': '51 65 85',
    '--color-background-400': '51 65 85',
    '--color-background-500': '51 65 85',
    '--color-background-600': '51 65 85',
    '--color-background-700': '51 65 85',
    '--color-background-800': '51 65 85',
    '--color-background-900': '51 65 85',
    '--color-background-950': '51 65 85',

    /* Background Special - Your dark theme */
    '--color-background-error': '239 68 68', // Your dark destructive #ef4444
    '--color-background-warning': '251 149 75', // Your dark accent #fb923c
    '--color-background-success': '52 131 82', // Keep green for success
    '--color-background-muted': '51 65 85', // Your dark muted #334155
    '--color-background-info': '66 165 245', // Your dark primary #42A5F5

    /* Focus Ring Indicator  */
    '--color-indicator-primary': '66 165 245', // Your dark primary #42A5F5
    '--color-indicator-info': '66 165 245', // Your dark primary #42A5F5
    '--color-indicator-error': '239 68 68', // Your dark destructive #ef4444
  }),
};
