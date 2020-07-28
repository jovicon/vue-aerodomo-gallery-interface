<template>
  <div>
    <b-navbar toggleable="lg">
      <b-navbar-brand href="#">Imagenes</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="https://www.aerodomo.com/admin/articles.php">Noticias</b-nav-item> -->
          <!-- <b-nav-item href="https://www.aerodomo.com/admin/categories.php">Categorias</b-nav-item> -->

          <b-button size="sm" class="my-2 my-sm-0" type="submit"  @click="$bvModal.show('bv-modal-example')">Agregar nueva imagen</b-button>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="bv-modal-example" hide-footer>

      <template v-slot:modal-title>
        Agregar una nueva imagen
      </template>

      <div class="d-block text-center">
          <VueFileAgent
            style="margin-top:50px;"
            ref="vueFileAgent"
            :theme="'grid'"
            :multiple="true"
            :deletable="true"
            :meta="true"
            :accept="'image/*'"
            :maxSize="'10MB'"
            :maxFiles="14"
            :helpText="'Escoge imagenes'"
            :errorText="{
              type: 'Solo se aceptan imagenes',
              size: 'Files should not exceed 10MB in size',
            }"
            @select="filesSelected($event)"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            v-model="fileRecords"
          ></VueFileAgent>

          <button :disabled="!fileRecordsForUpload.length" @click="uploadFiles();" style="margin-top:20px;">
            Subir {{ fileRecordsForUpload.length }} archivos
          </button>
      </div>

      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Cerrar</b-button>

    </b-modal>

    <b-modal id="bv-modal-example-message" hide-footer>

      <template v-slot:modal-title>
        Agregar un texto a la imagen
      </template>

      <div class="d-block text-center">

        <b-img thumbnail fluid v-bind:src="messageFile.url"></b-img>

        <b-form @submit="onSubmitMessage($event)" style="margin-top:10px;">

            <b-form-group
              id="input-group-1"
              label="Mensaje Español:"
              label-for="input-1"
              description="Cambie el texto y presione el boton guardar."
            >
              <b-form-textarea
                id="input-1"
                v-model="messageFile.mensaje"
                type="text"
                required
                placeholder="Inserte un mensaje"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Mensaje Ingles:"
              label-for="input-1"
              description="Cambie el texto y presione el boton guardar."
            >
              <b-form-textarea
                id="input-1"
                v-model="messageFile.message"
                type="text"
                required
                placeholder="Inserte un mensaje"
              ></b-form-textarea>
            </b-form-group>

            <b-button 
              size="sm" 
              class="my-2 my-sm-0" 
              type="submit"  
              style="margin-top:20px!important; margin-left:10px;"
            >
              Guardar 
            </b-button>
        </b-form>
      
      </div>

    </b-modal>

    <b-container style="margin-top:30px;">

      <!-- Content here -->

        <!-- v-for="(fileRecord,index) in fileRecords" :key="index" -->

          <b-jumbotron header="Admin Galeria" lead="">
           
            <b-row v-for="i in Math.ceil(fileRecords.length / 3)" v-bind:key="i" style="margin-bottom:30px;">

              <b-col cols="4" v-for="(fileRecord,index) in fileRecords.slice((i - 1) * 3, i * 3)" :key="index">
                <b-img thumbnail fluid v-bind:src="fileRecord.url" v-bind:alt="fileRecord.name"></b-img>

                <b-button 
                  size="sm" 
                  class="my-2 my-sm-0" 
                  type="submit"  
                  @click="$bvModal.show('bv-modal-example-message'); messageFile = fileRecord;"
                  style="margin-top:10px!important;"
                >
                  Editar texto
                </b-button>

                <b-button 
                  size="sm" 
                  class="my-2 my-sm-0" 
                  type="submit"  
                  @click="deleteUploadedFileRefresh(fileRecord)"
                  style="margin-top:10px!important;margin-left:10px;"
                >
                  Eliminar imagen
                </b-button>

              </b-col>

            </b-row>

          </b-jumbotron>

    </b-container>

  </div>
</template>

<style>
  #app {
    margin:0!important
  }

  @media (min-width: 576px) {
    #bv-modal-example .modal-dialog {
      max-width:80%!important;
    }
  }
</style>

<script>
  export default {
    data: function () {
      return {
        fileRecords: [],
        uploadUrl: 'https://www.aerodomo.com/admin/routes/api.php',
        // uploadHeaders: { 'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL' },
        fileRecordsForUpload: [],
        messageFile: {}
      };
    },
    methods: {
      uploadFiles: function () {
        // Using the default uploader. You may use another uploader instead.
        this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload);
        this.fileRecordsForUpload = [];

        setTimeout(() => location.reload(), 12000);
      },
      deleteUploadedFile: function (fileRecord) {
        // Using the default uploader. You may use another uploader instead.
        console.log(fileRecord)

        let url = 'https://www.aerodomo.com/admin/routes/api.php'
        this.axios.delete(url, { data: { my_key: fileRecord.key } } )
        .then((response) => {
          console.log(response)
          this.getFileRecords()
        })

        this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
      },
      deleteUploadedFileRefresh: function (fileRecord) {
        // Using the default uploader. You may use another uploader instead.
        console.log(fileRecord)

        let url = 'https://www.aerodomo.com/admin/routes/api.php'
        this.axios.delete(url, { data: { my_key: fileRecord.key } } )
        .then((response) => {
          console.log(response)
          location.reload()
        })

        this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
      },
      filesSelected: function (fileRecordsNewlySelected) {
        var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      },
      onBeforeDelete: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          if (confirm('Seguro que quieres borrar este archivo?')) {
            this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
          }
        }
      },
      fileDeleted: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          this.deleteUploadedFile(fileRecord);
        }
      },
      getFileRecords() {
        let url = 'https://www.aerodomo.com/admin/routes/api.php'

        var body = new FormData();
        body.append("from", "getFileRecords")

        this.axios.post(url,body)
        .then((response) => {
          console.log(response)
          this.fileRecords = response.data
        })
      },
      onSubmitMessage(event){
        event.preventDefault()

        let url = 'https://www.aerodomo.com/admin/routes/api.php'

        var body = new FormData();
        body.append("from", "updateFileRecords")
        body.append("gallery", JSON.stringify(this.messageFile))

        this.axios.post(url,body)
        .then((response) => {
          console.log(response)
          location.reload()
        })
      }
    },
    created() {
      // `this` hace referencia a la instancia vm
      this.getFileRecords()
    }
  };
</script>