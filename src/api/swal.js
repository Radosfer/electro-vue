let vswal = function (options) {
  return new Promise((resolve, reject) => {
    swal(options, function (isConfirm) {
      if (isConfirm) {
        resolve()
      }
    })
  })
}

export default vswal
